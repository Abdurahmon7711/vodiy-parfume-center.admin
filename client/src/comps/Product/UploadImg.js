import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
   
}));

export default function UploadButtons() {
    const [imageUrl, setImageUrl] = useState('')
    const classes = useStyles();
    const upLoad = (e) => {
        setImageUrl(e.target.value)
    }
    return (
        <div className="imageUpload">
            <p>{imageUrl}</p>
            {/* URL.createObjectURL */}
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={upLoad}
            />
            <label htmlFor="contained-button-file">
                <Button
                    className="imageUpload-btn"
                    variant="contained" 
                    color="primary" 
                    component="span"
                >
                    Upload
                </Button>
            </label>

        </div>
    );
}
