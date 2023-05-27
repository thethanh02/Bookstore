import React from "react";
import { Button, Image, Label } from "semantic-ui-react";

const ImageUpload = ({ base64Data, setBase64Data }) => {
    
    const onChangeImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = handleReaderLoaded;
            reader.readAsBinaryString(file);
        }
    };

    const handleReaderLoaded = (e) => {
        const binaryString = e.target.result;
        setBase64Data(`data:image;base64,${btoa(binaryString)}`);
    };

    return (
        <>
            <Label as="label" basic htmlFor="upload" >
                <Button
                    icon="upload"
                    label={{
                        basic: true,
                        content: 'Select file(s)'
                    }}
                    labelPosition="right"
                    type='button'
                />
                <input
                    hidden
                    type="file"
                    id="upload"
                    accept="image/*"
                    onChange={e => onChangeImage(e)}
                />
            </Label>
            {base64Data != null && <Image src={base64Data} size="small" rounded />}
        </>
    )
}

export default ImageUpload;
