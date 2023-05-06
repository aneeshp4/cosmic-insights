import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useState, useEffect } from "react";
import axios from "axios";

function News() {
    const [news, setNews] = useState([]);

    
    return(
        <div>
            <h1>News</h1>
            <div>
                <Carousel>
                    <div>
                        <h3>News 1</h3>
                    </div>

                </Carousel>
            </div>
        </div>
    )
}

export default News;