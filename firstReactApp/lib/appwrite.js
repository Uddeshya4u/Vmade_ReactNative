import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
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
