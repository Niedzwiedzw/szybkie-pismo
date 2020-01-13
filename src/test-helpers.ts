import {Block, Parser} from "@/extended-markdown-parser/parser";
import {Lexer} from "@/extended-markdown-parser/lexer";
import {Token} from "@/extended-markdown-parser/token";

export const getTokens = (text:string): Token[] => (new Lexer(text)).tokens();
export const getBlock = (text: string): Block => (new Parser(getTokens(text)).block);
