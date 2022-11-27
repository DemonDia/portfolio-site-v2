import React, { useState } from "react";
import axios from "axios";
function MessageComponent(props) {
    const [senderName, setSenderName] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [messageContent, setMessageContent] = useState("");
    const API_URL = process.env.REACT_APP_MESSAGING_API;

    const sendMsg = async () => {
        if (
            senderName != "" &&
            senderEmail != "" &&
            messageTitle != "" &&
            messageContent != ""
        ) {
            await axios
                .post(API_URL + "/messages", {
                    senderName: senderName,
                    senderEmail: senderEmail,
                    messageTitle: messageTitle,
                    messageContent: messageContent,
                })
                .then((res) => {
                    setSenderName("");
                    setSenderEmail("");
                    setMessageTitle("");
                    setMessageContent("");
                    if (res.data.success) {
                        alert("Sent!");
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    setSenderName("");
                    setSenderEmail("");
                    setMessageTitle("");
                    setMessageContent("");
                    alert(err);
                });
        } else {
            alert("Fields cannot be empty")
        }
    };
    return (
        <>
            <button
                className="btn msgBtn"
                data-bs-toggle="modal"
                data-bs-target="#messageModal"
            >
                Hit me up
            </button>
            <div
                className="modal fade"
                id="messageModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div
                        class="modal-content"
                        style={{ background: "#475466" }}
                    >
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                Send a message
                            </h1>
                        </div>
                        <div class="modal-body">
                            <label className="form-label fs-5">Name:</label>
                            <input
                                required
                                placeholder="Enter Name"
                                className="form-control"
                                value = {senderName}
                                onChange={(e) => {
                                    setSenderName(e.target.value);
                                }}
                            />
                            <label className="form-label fs-5">Email:</label>
                            <input
                                required
                                type={"email"}
                                placeholder="Enter Email"
                                className="form-control"
                                value={senderEmail}
                                onChange={(e) => {
                                    setSenderEmail(e.target.value);
                                }}
                            />
                            <label className="form-label fs-5">Title:</label>
                            <input
                                required
                                placeholder="Enter a short title"
                                className="form-control"
                                value={messageTitle}
                                onChange={(e) => {
                                    setMessageTitle(e.target.value);
                                }}
                            />
                            <label className="form-label fs-5">Message:</label>
                            <textarea
                                required
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Enter a message"
                                value={messageContent}
                                onChange={(e) =>
                                    setMessageContent(e.target.value)
                                }
                            ></textarea>
                            <button
                                onClick={() => {
                                    sendMsg();
                                }}
                                className="btn msgBtn"
                                data-bs-dismiss="modal"
                                style={{ margin: "10px" }}
                            >
                                Send
                            </button>
                        </div>
                        <div class="modal-footer"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MessageComponent;
