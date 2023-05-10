// ./src/azure-storage-blob.ts

// <snippet_package>
// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

const containerName = `attachments`;
const sasToken = process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_TOKEN;
// console.log(sasToken)
const storageAccountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;
// console.log(storageAccountName)
// </snippet_package>
// <snippet_get_client>
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;


// get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
const blobService = new BlobServiceClient(uploadUrl);

// get Container - full public read access
const containerClient: ContainerClient =
    blobService.getContainerClient(containerName);
// </snippet_get_client>

// Feature flag - disable storage feature to app if not configured
// </snippet_isStorageConfigured>

// <snippet_getBlobsInContainer>
// return list of blobs in container to display
export const getBlobInContainer = async () => {


    // get list of blobs in container
    // eslint-disable-next-line
    // for await (const blob of containerClient.listBlobsFlat()) {
        // console.log(`${blob.name}`);

        // const blobItem = {
        //     url: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`,
        //     name: blob.name
        // }
        // console.log(blobItem.url)

        // if image is public, just construct URL
        // returnedBlobUrls.push(blobItem);
    // }

    // return returnedBlobUrls;
};
// </snippet_getBlobsInContainer>

// <snippet_createBlobInContainer>
const createBlobInContainer = async (file: File) => {
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
        await blobClient.uploadData(file, options);

};
// </snippet_createBlobInContainer>

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file: File | null): Promise<string> => {
    if (!file) return "";

    // upload file
     await createBlobInContainer(file);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;