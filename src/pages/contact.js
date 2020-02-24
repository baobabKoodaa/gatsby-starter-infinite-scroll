import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline';

import { Location } from '@reach/router'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import { FaComment, FaPhoneSquare, FaEnvelope, FaUser } from 'react-icons/fa'

const ContactPage = (props) => (
    <Layout>
        <div class="page">

            <Container maxWidth="sm">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you! For media inquiries you can also email us at <a href="mailto:holacabomx@gmail.com">holacabomx@gmail.com</a>.</p>
                <div class="form">
                    <form name="contact" method="POST" netlify>
                        {/* Name */}
                        <Grid item xs={12}>
                            <FormControl class="field">
                                <Input
                                    id="name" aria-describedby="name"
                                    label="Name" name="name" type="text" fullWidth
                                    placeholder="Who are you?"
                                    required
                                    startAdornment={<InputAdornment position="start"><FaUser style={{ color: '#D8D8D8' }} /></InputAdornment>}
                                />
                            </FormControl>
                        </Grid>

                        {/* Email */}
                        <Grid item>
                            <FormControl class="field">
                                <Input
                                    id="email" aria-describedby="email"
                                    label="Email" name="email" type="email" fullWidth
                                    placeholder="Your email address"
                                    required
                                    startAdornment={<InputAdornment position="start"><FaEnvelope style={{ color: '#D8D8D8' }} /></InputAdornment>}
                                />
                            </FormControl>
                        </Grid>

                        {/* Phone / WhatsApp */}
                        <Grid item>
                            <FormControl class="field">
                                <Input
                                    id="phone" aria-describedby="phone"
                                    label="Phone" name="phone" type="tel" fullWidth
                                    placeholder="Phone / WhatsApp"
                                    startAdornment={<InputAdornment position="start"><FaPhoneSquare style={{ color: '#D8D8D8' }} /></InputAdornment>}
                                />
                            </FormControl>
                        </Grid>

                        {/* Message */}
                        <Grid item>
                            <FormControl class="field">
                                <Input
                                    id="message" aria-describedby="message"
                                    label="Message" name="message" multiline fullWidth
                                    rows={6}
                                    placeholder="How can we help you?"
                                    required
                                    startAdornment={<InputAdornment position="start"><FaComment style={{ color: '#D8D8D8' }} /></InputAdornment>}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <button type="submit">Send</button>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    </Layout>
)

export default ContactPage