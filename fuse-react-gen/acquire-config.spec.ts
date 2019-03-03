///<reference types='jasmine'/>
import { Question } from 'inquirer';
import * as yargs from 'yargs/yargs';
import { parseAgainstConfig } from './acquire-config';

describe('acquire-config', () => {
  it('parses yargs', async () => {
    const cli = '-a appName -p 4567';
    const args = await parseAgainstConfig('./examples/{{app}}/.react-gen-rc.json', cli,
      questions => Promise.resolve({
        version: '1.4.0.2',
        package: '@mock/module',
        questions
      }));

    expect(args.app).toBe('appName');
    expect(args.port).toBe(4567);

    expect(args.questions).not.toBe(null);

    const questions: Question[] = args.questions;
    expect(questions.length).toBe(1);
    expect(questions[0].name).toBe('package');
  })
})