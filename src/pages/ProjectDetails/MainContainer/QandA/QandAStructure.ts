import { QuestionAndAnswer } from "types/projectTypes";

export interface QandAStructure extends QuestionAndAnswer {
    children: QuestionAndAnswer[];
}