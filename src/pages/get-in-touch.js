import React from "react";
import { Layout } from "../components/common";

import { MetaData } from "../components/common/meta";
/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const GetInTouch = ({ data, location, pageContext }) => {
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [done, setDone] = React.useState(false);
    const submit = () => {
        fetch("https://getintouch.freshair.org.uk", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });
        setDone(true);
    };
    const redo = () => {
        setName("");
        setEmail("");
        setMessage("");
        setDone(false);
    };
    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout>
                <div className="inner">
                    <header className="m-top tag-header">
                        <h1>Get in Touch</h1>
                        <section class="inner get-in-touch">
                            <p>
                                Do you have some ideas for us? Some music for us
                                to check out? Anything else? Just fill out this
                                form and we'll get back to you as soon as we
                                can!
                            </p>
                            {done ? (
                                <div class="middle">
                                    <h2>Thank you!</h2>
                                    <button class="form-submit" onClick={redo}>
                                        Say something else
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
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    ></input>
                                    <textarea
                                        rows="5"
                                        class="message-input"
                                        placeholder="Your message..."
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

export default GetInTouch;
