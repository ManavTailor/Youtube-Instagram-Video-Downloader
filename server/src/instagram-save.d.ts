declare module 'instagram-save' {
  function instagramSave(url: string, destination: string): Promise<{ url: string; type: string }>;
  export = instagramSave;
}