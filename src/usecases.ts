import {
    ref,
    computed,
    watch,
    Ref,
} from '@vue/composition-api';
import { SUPPORTED_DOCUMENTS } from '@/documents';
import { pick, keys, fromPairs, map, replace, capitalize, isNil } from 'lodash';
import { RenderArgs } from '@/extended-markdown-parser/renderer';
import { Commentary } from '@/extended-markdown-parser/commentary';
import { DynamicText } from '@/extended-markdown-parser/transform';
import { merged, updateOwn } from '@/helpers';

export const useDocumentRendering = () => {
    const markdownInput = ref('');
    const supportedDocuments = ref(SUPPORTED_DOCUMENTS);
    const documentNames = computed(() => keys(supportedDocuments.value));
    const selected = ref<string | null>(null);
    const kwargs = ref<RenderArgs>({ variables: {}, ifStatements: {} });
    const allVariables = computed(() => [
        ...keys(kwargs.value?.ifStatements ?? {}),
        ...keys(kwargs.value?.variables ?? {}),
    ]);

    const commentary = ref({});
    const emptyCommentary: Ref<Commentary> = computed<Commentary>(() =>
        pick(
            {
                ...fromPairs(
                    map(allVariables.value, v => [v, capitalize(replace(v, /_/g, ' '))])
                ),
                ...commentary.value,
            },
            allVariables.value
        )
    );

    commentary.value = emptyCommentary.value;

    const rendered = computed(() => {
        const renderer = new DynamicText(markdownInput.value);
        const [kwargs_, fn] = renderer.renderer;
        const newKwargs = merged(kwargs_, kwargs.value);
        newKwargs.variables = pick(
            newKwargs.variables,
            keys(kwargs_.variables)
        ) as any;
        newKwargs.ifStatements = pick(
            newKwargs.ifStatements,
            keys(kwargs_.ifStatements)
        ) as any;
        kwargs.value = newKwargs;
        return fn(kwargs.value);
    });

    watch(
        () => selected.value,
        (newVal: string | null) => {
            if (isNil(newVal)) return;
            markdownInput.value = supportedDocuments.value[newVal] ?? '';
        }
    );

    watch(
        () => markdownInput.value,
        () => setTimeout(() => commentary.value = updateOwn(emptyCommentary.value, commentary.value)),
    );

    return {
        markdownInput,
        supportedDocuments,
        documentNames,
        selected,
        kwargs,
        allVariables,
        commentary,
        rendered,
        readyToPrint: computed<boolean>(() => rendered.value.length > 0),
    };
}

export const usePFDGenerator = () => {
    return {
        printElement(element: HTMLDivElement, title?: string) {
            const contents = element.outerHTML;

            const printWindow = window.open('', '', 'width=21.6cm,height=29.7cm');
            setTimeout(() => {
                printWindow!.document.write(
                    `
                <html>
                    <head>
                        <title>${title ?? 'dokument-durlex.pdf'}</title>
                    </head>
                    <body>
                        ${contents}
                    </body>
                </html>
                `
                );


                printWindow!.document.close();
                printWindow!.print();
            }, 1000);


        },
    }
}