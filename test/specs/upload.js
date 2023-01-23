const path = require('path');

describe('Upload file', () => {
    beforeEach(async () => {
        await browser.maximizeWindow()
    });
    
    it('Upload with choose file button visible',async () => {
        await browser.url('https://the-internet.herokuapp.com/upload');
        const filePath = path.join(__dirname, '../data/test_upload.png');
        const remoteFilePath = await browser.uploadFile(filePath);
        await $('#file-upload').setValue(remoteFilePath); 
        await $('#file-submit').click();
        await expect($('h3')).toHaveText('File Uploaded!')
    });

    it('Upload file with choose button hiden (unhiding the button and uploading the file)',async () => {
        await browser.url('/cart/');
        const filePath = path.join(__dirname, '../data/test_upload.png');
        const remoteFilePath = await browser.uploadFile(filePath)
        await browser.execute("document.querySelector('#upfile_1').className = '' ");
        await $('#upfile_1').setValue(remoteFilePath);
        await $('#upload_1').click();
        await expect($('#wfu_messageblock_header_1_label_1')).toHaveTextContaining('uploaded successfully');
    });
});