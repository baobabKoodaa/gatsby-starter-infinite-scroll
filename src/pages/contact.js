import React from "react"
import { Location } from '@reach/router'
import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = (props) => (
    <Layout>
        <div class="page">
            <h1>Contact Us</h1>
            <div>
                <form class="form" name="contact" method="POST" netlify>
                    <p>
                        <label>Name: <input type="text" name="name" /></label>
                    </p>
                    <p>
                        <label>Email: <input type="email" name="email" /></label>
                    </p>
                    <p>
                        <label>Phone/WhatsApp: <input type="email" name="email" /></label>
                    </p>
                    <p>
                        <label>Message: <textarea name="message"></textarea></label>
                    </p>
                    <p>
                        <button type="submit">Send</button>
                    </p>
                </form>
            </div>
        </div>
    </Layout>
)

export default ContactPage


// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// // import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// const useStyles = makeStyles(theme => ({
//     paper: {
//         // marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(3),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));

// export default function ContactPage() {
//     const classes = useStyles();

//     return (
//         <Container maxWidth="xs">
//             {/* <CssBaseline /> */}
//             <div className={classes.paper}>
//                 <Avatar className={classes.avatar}>
//                     {/* <LockOutlinedIcon /> */}
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Contact Us
//         </Typography>
//                 <form className={classes.form} noValidate>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 name="name"
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="name"
//                                 label="Name"
//                                 autoFocus
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Email"
//                                 name="email"
//                                 autoComplete="email"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 id="password"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <FormControlLabel
//                                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                                 label="I want to receive deals, marketing promotions and updates via email."
//                             />
//                         </Grid>
//                     </Grid>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         className={classes.submit}
//                     >
//                         Send
//           </Button>
//                     <Grid container justify="flex-end">
//                         <Grid item>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </div>
//         </Container>
//     );
// }