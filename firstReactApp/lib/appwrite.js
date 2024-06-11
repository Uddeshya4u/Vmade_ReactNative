import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.somecompany.V_made_RNA',
  projectId: '665498420028aa477076',
  databaseId: '6654d3a6002dd92a4664',
  userCollectionId: '6654d3e60025918b8e1b',
  videosCollectionId: '6654d415001fee3c53e2',
  storageBucketId: '6654d6d80022b2de1028',
};

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

// Register User
const account = new Account(client);
const avatars = new Avatars(client);
const dbs = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, userName) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      userName
    );
    if (!newAccount) {
      throw Error('Failed to create new Account');
    }
    const avatarUrl = avatars.getInitials(userName);
    await signIn(email, password);
    const newUser = dbs.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, userName, avatar: avatarUrl }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    //await account.deleteSession('current');
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error('Was trying to get current account');
    }
    const currentUser = await dbs.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser) {
      throw Error('Was trying to get current user');
    }
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await dbs.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};
export const getLatestlPosts = async () => {
  try {
    const posts = await dbs.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(5))]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchedPosts = async (query) => {
  try {
    const posts = await dbs.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await dbs.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.equal('users', userId)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};
export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw Error(error);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    const newPost = await dbs.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        users: form.userId,
      }
    );
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;
  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageBucketId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, fileType) => {
  let fileUrl;
  try {
    if (fileType === 'video') {
      fileUrl = storage.getFileView(appwriteConfig.storageBucketId, fileId);
    } else if (fileType === 'image') {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageBucketId,
        fileId,
        2000,
        2000,
        'top',
        100
      );
    } else {
      throw new Error('Invalid File Type');
    }
    if (!fileUrl) Error(error);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};
