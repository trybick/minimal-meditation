export type State = {
  currentDialog: DialogName | null;
  customDuration: string;
};

export type DialogName = 'DurationOptions' | 'CustomDuration' | 'EndingSound';

export type Action =
  | { type: 'openDialog'; name: DialogName }
  | { type: 'closeDialogs' }
  | { type: 'setCustomDuration'; value: string };
