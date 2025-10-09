export type ApplyMagangPayload = {
  nama: string;
  nrp: string;
  kelompokKP: string;
  mindmap: File;
};

export type ApplyMagangResponse = {
  message: string;
  applicant: {
    nama: string;
    nrp: string;
    kelompokKP: string;
    fileName: string;
    fileSize: number;
  };
};
