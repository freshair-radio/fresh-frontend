import React from "react";
import { Layout } from "../components/common";
import { Link } from "gatsby";

import { MetaData } from "../components/common/meta";
/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const FAQ = ({ data, location, pageContext }) => {
    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout bodyClass="page-template">
                <div className="inner">
                    <article className="post-full">
                        <header className="post-full-header">
                            <h1 className="post-full-title">FAQs</h1>
                        </header>
                        <section className="post-full-content faq">
                            <div className="post-content load-external-scripts">
                                <h2>What to do if something goes wrong</h2>

                                <p>
                                    First, make sure you’ve followed the steps
                                    from this document properly. If there’s
                                    still an issue, go to{" "}
                                    <Link to="/help">freshair.org.uk/help</Link>{" "}
                                    and submit an issue. Please don’t post on
                                    the Freshair Members Facebook group, as this
                                    isn’t likely to be seen in a timely fashion.
                                    If your issue is urgent, there’re a couple
                                    things you can do, as well as reporting an
                                    issue:
                                </p>

                                <ul>
                                    <li>
                                        If it’s an issue with broadcasting (e.g.
                                        the studio is not live), you’re not
                                        likely to get a response during your
                                        show, so do your show as normal,
                                        recording with Audacity. After your
                                        show, edit your recording as you usually
                                        would, and upload as a podcast as
                                        normal, following the instructions
                                        below.
                                    </li>
                                    <li>
                                        If it’s a problem with the studio
                                        computer (e.g. mAirList crashing), try
                                        and work around as best you can using
                                        the “PC1” fader and Windows Media
                                        Player. You may also have to talk more
                                        than usual.
                                    </li>
                                </ul>

                                <h2>Going on air</h2>

                                <ul>
                                    <li>
                                        Log in to the studio computer with
                                        username “.\freshair” and password
                                        “freshair”
                                    </li>
                                    <li>
                                        A black application might flash up for a
                                        second or less - it's really important
                                        that this isn't closed. It'll close
                                        itself after a second or so.
                                    </li>
                                    <li>Open up Firefox</li>
                                    <li>
                                        Go to{" "}
                                        <a href="https://live.freshair.org.uk">
                                            live.freshair.org.uk
                                        </a>
                                        , enter your username, and press “Go”
                                    </li>
                                    <li>Select your show</li>
                                    <li>
                                        When your show’s finished, if there’s
                                        another show after you, select “Change
                                        Show”, or if you’re the last show of the
                                        day, select “Go Off Air”
                                    </li>
                                </ul>

                                <h2>Accessing show recordings</h2>

                                <ul>
                                    <li>
                                        Go to{" "}
                                        <a href="https://recordings.freshair.org.uk">
                                            recordings.freshair.org.uk
                                        </a>
                                        , enter your username, and press “Go”
                                    </li>
                                    <li>Select your show</li>
                                    <li>
                                        You should see a list of recordings,
                                        named by the date and time
                                    </li>
                                    <li>
                                        Click on the one you want to download it
                                    </li>
                                </ul>

                                <h2>Access your account for the first time</h2>

                                <ul>
                                    <li>
                                        Go to{" "}
                                        <a href="https://admin.freshair.dev/ghost">
                                            admin.freshair.dev/ghost
                                        </a>
                                    </li>
                                    <li>
                                        Enter the email address you used on the
                                        contributor form
                                    </li>
                                    <li>Click &quot;Forgot&quot;</li>
                                    <li>
                                        Check your email for a password reset
                                        link - it should have the subject line
                                        &quot;Reset Password&quot;
                                    </li>
                                    <li>
                                        Click on the link, and make a strong
                                        password
                                    </li>
                                    <li>
                                        Once you&#39;ve logged in, to access and
                                        modify your account details, go to the
                                        &quot;Staff&quot; tab, and select the
                                        user with your name. Something to note
                                        from your user page is your username,
                                        which is under the heading
                                        &quot;Slug&quot;
                                    </li>
                                </ul>

                                <h2>Posting an article</h2>

                                <ul>
                                    <li>
                                        Sign in at{" "}
                                        <a href="https://admin.freshair.dev/ghost">
                                            admin.freshair.dev/ghost
                                        </a>
                                    </li>
                                    <li>
                                        On the left sidebar, under manage,
                                        select &quot;Posts&quot;
                                    </li>
                                    <li>
                                        In the top right corner, there should be
                                        a button &quot;New post&quot;. Click it.
                                        This should open up the editor.
                                    </li>
                                    <li>Write your post in the editor</li>
                                    <li>
                                        In the top right corner, there should be
                                        a cog icon. Click it. This should open a
                                        settings sidebar on the right hand side
                                        of your page.
                                    </li>
                                    <li>Upload an image for your post</li>
                                    <li>
                                        In the tag field, by typing and
                                        selecting from the autocomplete, add the
                                        tag &quot;#Article&quot;.
                                    </li>
                                    <li>
                                        Depending on what team you&#39;re
                                        writing for, add the team tag
                                        (&quot;#Arts&quot;, &quot;#Music&quot;,
                                        &quot;#Sports&quot;, &quot;#News&quot;,
                                        etc...).
                                    </li>
                                    <li>
                                        Add any other tags that you would
                                        normally (&quot;Reviews&quot; if
                                        it&#39;s a review, for instance). It’s
                                        important that none of these start with
                                        a “#”.
                                    </li>
                                    <li>
                                        If your post is a review, add the
                                        appropriate star rating, by adding one
                                        tag from the set of star tags (&quot;#1
                                        star&quot;, &quot;#1.5 stars&quot;,
                                        &quot;#2 stars&quot; etc...)
                                    </li>
                                    <li>
                                        Close the settings sidebar, and click
                                        “Publish”.
                                    </li>
                                    <li>
                                        Your post will show up on{" "}
                                        <a href="https://freshair.org.uk">
                                            freshair.org.uk
                                        </a>{" "}
                                        within about a minute.
                                    </li>
                                </ul>

                                <h2>Editing your show details</h2>

                                <ul>
                                    <li>
                                        Go to{" "}
                                        <a href="https://admin.freshair.dev/ghost/#/posts?tag=hash-show">
                                            admin.freshair.dev/ghost/#/posts?tag=hash-show
                                        </a>{" "}
                                        to list all the shows you&#39;re
                                        involved in.
                                    </li>
                                    <li>
                                        Choose the show you want to change the
                                        details of.
                                    </li>
                                    <li>
                                        This will open up the post editor.
                                        Within that, the title of the post
                                        corresponds to the title of your show,
                                        the body of the post corresponds to the
                                        description of your show, and the
                                        post&#39;s cover image corresponds to
                                        the cover image for your show.
                                    </li>
                                    <li>
                                        Keeping the above in mind, edit the
                                        parts you&#39;d like to, and publish the
                                        post to see your changes reflected on{" "}
                                        <a href="">https://freshair.org.uk</a>,
                                        within about a minute.
                                    </li>
                                </ul>

                                <h2>Adding a podcast</h2>

                                <ul>
                                    <li>
                                        Download the recording you want to use,
                                        following the instructions for accessing
                                        recordings given above
                                    </li>
                                    <li>
                                        Do any editing you want with this file,
                                        but make sure to export as an MP3 with
                                        the same settings as it was originally.
                                        As a quick sanity check, the file should
                                        be around 82MB in size for an hour long
                                        show.
                                    </li>
                                    <li>
                                        Go to{" "}
                                        <a href="https://audio.freshair.org.uk">
                                            audio.freshair.org.uk
                                        </a>
                                        .
                                    </li>
                                    <li>
                                        Type in your username (from the
                                        instructions above), and press
                                        &quot;Go&quot;.
                                    </li>
                                    <li>
                                        Click &quot;Upload a Podcast&quot;, and
                                        select your edited audio file.
                                    </li>
                                    <li>
                                        This will take a few minutes or longer,
                                        so leave this webpage open until it says
                                        that it’s finished uploading.
                                    </li>
                                    <li>
                                        Once it&#39;s uploaded, copy the text
                                        displayed on the webpage.
                                    </li>
                                    <li>
                                        Log in to{" "}
                                        <a href="https://admin.freshair.dev/ghost">
                                            admin.freshair.org.uk/ghost
                                        </a>
                                    </li>
                                    <li>
                                        Create a new post per the steps above.
                                        The title of the post corresponds to the
                                        title of this episode of your show and
                                        the body of the post corresponds to the
                                        description of this episode of your
                                        show.
                                    </li>
                                    <li>
                                        The first thing in your post body should
                                        be an HTML block (accessed by clicking
                                        the plus icon on a new line), with the
                                        text you copied earlier pasted in.
                                    </li>
                                    <li>
                                        This post will need a few tags to
                                        display properly: &quot;#Podcast&quot;
                                        and your show’s tag, which is a hashtag
                                        and the name of your show (e.g.
                                        &quot;#The Pocket Book”).
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    );
};

export default FAQ;
