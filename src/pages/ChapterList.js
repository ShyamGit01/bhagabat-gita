
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material'
import { allChapter } from '../services/apiService';

const ChapterList = ({ children }) => {
    const [chapterList, setChapterList] = useState([])
    useEffect(() => {
        allChapter()
            .then(response => setChapterList(response))

    }, [])
    return (
        <>
            <Grid container spacing={2} sx={{ marginTop: 0}}>
                <Grid item xs={3} sx={{ backgroundColor: '#AEB3FF' }}>
                    <ul style={{ listStyle: 'none' }}>
                        {chapterList.map(el => {
                            return <NavLink to={'ch/' + el.id + '/' + el.verses_count} key={el.id} >
                                <li key={el.id}>
                                    Chapter-{el.id} ({el.name_translated})
                                </li>
                            </NavLink>
                        })}
                    </ul>
                </Grid>
                {/* <Grid item xs={1}></Grid> */}
                <Grid item xs={9}>


                    <main>{children}</main>
                    {/* <Outlet /> */}


                </Grid>
            </Grid>
        </>
    )
}

export default ChapterList

