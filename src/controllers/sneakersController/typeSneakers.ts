export type SneakerReq = {
  body: {
    title: string;
    price: number;
  };
  files: {
    photo: multerFile;
  };
};

interface multerFile {
  mv: Function;
}
