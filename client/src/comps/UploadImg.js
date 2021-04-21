import React from 'react';
import ImageUploader from 'react-images-upload';
 
export default class UploadImage extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    
    render() {
        console.log(this.state.pictures)
        return (
            <ImageUploader
                withPreview={true}
                singleImage={true}
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        );
    }
}