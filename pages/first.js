import React, { useState, useEffect } from "react";

export default function First(props) {
    return (
        <> 
            <div className="bg-white fixed px-14 py-4 flex flex-row">
                <div className="ml-auto">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Courses</a>
                    <a href="#">Shedule</a>
                    <a href="#">Contact</a>
                </div>
            </div>
        </>
    )
}