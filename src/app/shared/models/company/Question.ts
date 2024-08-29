import { QuestionType } from './QuestionType';

export interface Question {
  id?: string;
  question: string;
  questionType: QuestionType;
}
