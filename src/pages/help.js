import React from "react";
import { Layout } from "../components/common";

import { MetaData } from "../components/common/meta";
/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const ReportIssue = ({ data, location, pageContext }) => {
    const [show, setShow] = React.useState("");
    const [name, setName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [done, setDone] = React.useState(false);
    const submit = () => {
        fetch("https://bugreport.freshair.org.uk", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                show,
                message
            })
        });
        setDone(true);
    };
    const redo = () => {
        setName("");
        setShow("");
        setMessage("");
        setDone(false);
    };
    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout>
                <div className="inner">
                    <header className="m-top tag-header">
                        <h1>Report an issue</h1>
                        <section class="inner get-in-touch">
                            {done ? (
                                <div class="middle">
                                    <h2>
                                        Thanks, we'll get back to you as soon as
                                        possible
                                    </h2>
                                    <button class="form-submit" onClick={redo}>
                                        Report another issue
                                    </button>
                                </div>
                            ) : (
                                <div class="middle">
                                    <input
                                        class="name-input"
                                        placeholder="Your name..."
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    ></input>
                                    <input
                                        class="email-input"
                                        placeholder="Your email..."
                                        value={show}
                                        onChange={e => setShow(e.target.value)}
                                    ></input>
                                    <textarea
                                        rows="5"
                                        class="message-input"
                                        placeholder="What's wrong? Please include your show name, and as much detail as you can"
                                        value={message}
                                        onChange={e =>
                                            setMessage(e.target.value)
                                        }
                                    ></textarea>
                                    <button
                                        class="form-submit"
                                        onClick={submit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </section>
                    </header>
                </div>
            </Layout>
        </>
    );
};

export default ReportIssue;
