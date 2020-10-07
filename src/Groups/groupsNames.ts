interface Subject {
  title: string;
  code: string;
}

interface SubjectDistinct extends Subject {
  mzcode: string;
}

export const firstYearGroupsNames: SubjectDistinct[] = [
  { title: 'ARCHITETTURA DEGLI ELABORATORI E LABORATORIO', code: '75p16zi', mzcode: 'ng7jsih' },
  { title: 'ELEMENTI DI ANALISI MATEMATICA 1', code: 'd6xcbpr', mzcode: 'lp5w1fv' },
  { title: 'FONDAMENTI DI INFORMATICA', code: 'ejrynpm', mzcode: 'c2j8hks' },
  { title: 'PROGRAMMAZIONE I E LABORATORIO', code: '2v8sv7c', mzcode: 'qtrs803' },
  { title: 'PROGRAMMAZIONE II', code: 'lmygl88', mzcode: '2a1gpff' },
  { title: 'ULTERIORI CONOSCENZE LINGUISTICHE', code: 'tf42bu0', mzcode: '' },
  { title: "ALGEBRA LINEARE E GEOMETRIA", code: "tv73vxy", mzcode: "7ul1o62" },
  { title: "STRUTTURE DISCRETE", code: "nn0ukwu", mzcode: "vmwcsyn" }
];

export const secondYearGroupsNames: SubjectDistinct[] = [
  { title: 'ALGORITMI E LABORATORIO', code: 'jm6xvd6', mzcode: '5llo7w4' },
  { title: 'BASI DI DATI', code: 'zcndn3g', mzcode: 'cp6ryjr' },
  { title: 'ELEMENTI DI ANALISI MATEMATICA 2', code: '63og1li', mzcode: '0wdw57b' },
  { title: 'INGEGNERIA DEL SOFTWARE', code: '0dg7gab', mzcode: '' },
  { title: 'RETI DI CALCOLATORI', code: '7emlunl', mzcode: '' },
  { title: 'SISTEMI OPERATIVI', code: 'i412gv5', mzcode: 'qlxao81' },
  { title: '[Discussione] Interazione e Multimedia L-31', code: '1vd4wnf', mzcode: 'twrmvmm' }
];

export const thirdYearGroupsNames: Subject[] = [
  { title: 'CALCOLO NUMERICO', code: '' },
  { title: 'COMPUTER GRAFICA', code: 'mnzsn9j' },
  { title: 'DIGITAL FORENSICS', code: '2jc74j2' },
  { title: 'FISICA', code: 'qd3vr5p' },
  { title: 'INFORMATICA MUSICALE', code: '7p26czo' },
  { title: 'INTERNET SECURITY', code: 'a6vfkk5' },
  { title: 'INTRODUZIONE AL DATA MINING', code: '9n8fwtm' },
  { title: 'IT LAW', code: 'hob6saf' },
  { title: 'LABORATORIO DI SISTEMI A MICROCONTROLLORE', code: '618usrd' },
  { title: 'METODI MATEMATICI E STATISTICI', code: 'jy5rnn8' },
  { title: 'PROGRAMMAZIONE MOBILE', code: 'pdzgqm8' },
  { title: 'PROGRAMMAZIONE PARALLELA SU ARCHITETTURE GPU', code: '3icuged' },
  { title: 'SISTEMI CENTRALI', code: 'bs923lh' },
  { title: 'SOCIAL MEDIA MANAGEMENT', code: 'e4mbxsj' },
  { title: 'STARTUP DI IMPRESA E MODELLI DI BUSINESS', code: 'jdy4mk5' },
  { title: 'SVILUPPO DI GIOCHI DIGITALI', code: 'x7fuqlt' },
  { title: 'TECHNOLOGIES FOR ADVANCED PROGRAMMING', code: 'cwecmqh' },
  {
    title: 'TECNOLOGIE PER I SISTEMI DISTRIBUITI E IL WEB CON LABORATORIO',
    code: 'bfei9jj'
  },
  { title: 'Web Development 2020', code: 'j0bqg8n' }
];
