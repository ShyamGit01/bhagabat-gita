import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Select, MenuItem, Card, Avatar, CardContent, CardHeader, Divider, ButtonGroup, Button, IconButton } from '@mui/material';
import { perticulalVerces } from '../services/apiService';
import { PlayCircle } from '@mui/icons-material';

import Speech from 'speak-tts'
import "./chapter.css"
import Spinner from '../components/Spinner';

const ChapterDetails = () => {
    const [loader, setLoader] = useState(true)
    const params = useParams()
    const [verse, setVerse] = useState([])
    const [verse_id, setVerse_id] = useState(1)

    const speech = new Speech() // will throw an exception if not browser supported
    if (speech.hasBrowserSupport()) { // returns a boolean
        // console.log("speech synthesis supported")
        speech.init().then((data) => {
            // console.log("Speech is ready, voices are available", data)
        }).catch(e => {
            console.error("An error occured while initializing : ", e)
        })
    }

    function text_to_speech(text, lang, rate = 1) {
        speech.setLanguage(lang)
        // console.log("rate==>", rate);
        speech.setRate(rate)
        speech.cancel()
        speech.speak({
            text,
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        })

    }

    const handleChange = (event) => {
        setVerse_id(event.target.value);
    };

    useEffect(() => { setVerse_id(1) }, [params.ch_id])

    useEffect(() => {
        perticulalVerces(params.ch_id, verse_id)
            .then(res => {
                let response = { ...res }
                response['eng'] = response.translations[response.translations.findIndex(el => { return el.language === 'english' })]
                response['hin'] = response.translations[response.translations.findIndex(el => { return el.language === 'hindi' })]
                setVerse(response)
                setLoader(false)
            })
    }, [params.ch_id, verse_id])

    function getVerces(verseLimit) {
        var menu = []
        for (let i = 1; i <= verseLimit; i++) {

            menu.push(<MenuItem value={i} key={i}>{i}</MenuItem>)

        }
        return menu
    }


    return (
        <div className='chapter_container' >
            {loader ? <Spinner /> : <Card sx={{ margin: 2, backgroundColor: '#FFFF99' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ backgroundColor: 'red' }} >
                            {verse.verse_number}
                        </Avatar>
                    }
                    title={(verse.slug) ? verse.slug.replaceAll('-', ' ').toUpperCase() : ''}
                />
                {/* <CardMedia
                  component="img"
                  height="194"
                  image="/static/images/cards/paella.jpg"
                  alt="Paella dish"
                /> */}
                <CardContent className='card_containt'>

                    <Typography variant="h6" color="text.primary">
                        {verse.text}
                    </Typography>

                    <IconButton onClick={() => text_to_speech(verse.text, 'hi-IN', .7)}>
                        <PlayCircle color="primary" />

                    </IconButton>
                    <Divider>Meaning</Divider>
                    <Typography variant="h6" color="text.primary">
                        {(verse.eng) ? verse.eng.description : ''}
                    </Typography>

                    <IconButton onClick={() => text_to_speech((verse.eng) ? verse.eng.description : '', 'en-IN', 1)}>
                        <PlayCircle color="primary" />

                    </IconButton>
                    <br />
                    <Typography variant="caption" color="text.secondary"  >
                        Translated By : {(verse.eng) ? verse.eng.author_name : ''}
                    </Typography>
                    <br />
                    <br />
                    <Divider>अर्थात</Divider>


                    <Typography variant="h6" color="text.primary">
                        {(verse.hin) ? verse.hin.description : ''}
                    </Typography>

                    <IconButton onClick={() => text_to_speech((verse.hin) ? verse.hin.description : '', 'hi-IN', .8)}>
                        <PlayCircle color="primary" />

                    </IconButton>
                    <br />

                    <Typography variant="caption" color="text.secondary"  >
                        Translated By : {(verse.hin) ? verse.hin.author_name : ''}
                    </Typography>

                    <br />
                    <Divider />
                    <br />

                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={() => { setVerse_id(verse_id - 1) }} disabled={(verse_id <= 1) ? true : false}>Previous</Button>

                        <Button color='secondary'>Jump to Verse<Select sx={{ height: 30 }}
                            placeholder='verse'
                            value={verse_id}
                            id="demo-simple-select"
                            label="Verse"

                            onChange={handleChange}
                        >
                            {getVerces(params.verse)}

                        </Select></Button>
                        <Button onClick={() => { setVerse_id(verse_id + 1) }} disabled={(verse_id.toString() === params.verse) ? true : false}>Next</Button>

                    </ButtonGroup>
                </CardContent>
            </Card>
            }


        </div>
    )
}

export default ChapterDetails
