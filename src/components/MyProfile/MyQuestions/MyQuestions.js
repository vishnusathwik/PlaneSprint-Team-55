import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import './myquestions.css';
import Posts from './Posts';
import Pagination from './Pagination';

export default function MyQuestions() {


    const [questions, setQuestions] = useState([]);

    // for pagination in questions in profile
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

    
    useEffect(() => {
        fetch(`http://localhost:5000/api/question/fetchUserQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data));
    },[]);

   

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);


    return (
        <div className="container" Style="height:100vh;margin-top:13vh; z-index:1; background-color:white">
            <ProfileSidebar />
            <div className='header_and_content' Style="width:100%;">
                <ProfileHeader />
                {/* questions loaded based on filters  */}
                <div className="questions" >
                    <div className="question" >
                        <Posts posts={currentPosts} />
                    </div>

                </div>
                <div className="container">
                    <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
                </div>

            </div>
        </div>
    )
}
