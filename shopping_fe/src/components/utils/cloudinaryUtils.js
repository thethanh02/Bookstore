const cloudName = 'dtfcwewam';

export const getCloudinaryImg = (imgRaw) => {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${imgRaw}`;
}