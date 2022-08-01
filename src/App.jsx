import React from "react";
import { Formik, Field, FieldArray } from "formik";
import { Container, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { TextField } from "formik-material-ui";
import { FormStepper } from "./FormStepper";
import { array, object, string } from "yup"; //

const App = () => {
  const linksGroup = { linkname: "", linkurl: "" };

  return (
    <Container sx={{ bgcolor: "#87c1ff4d", paddingY: 3, marginTop: 5 }}>
      <Typography variant="h3" align="center" component="h2">
        Formik Form
      </Typography>
      <Card sx={{ marginTop: 2 }}>
        <CardContent sx={{ paddingY: 10, paddingX: 5 }}>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              links: [linksGroup],
            }}
            validationSchema={object({
              firstname: string().required("First Name is required"),
              lastname: string().required("Last Name is required"),
              links: array(
                object({
                  linkname: string().required("Link Name is required"),
                  linkurl: string().required("Link URL is required"),
                })
              ),
            })}
            onSubmit={async (values, actions) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ values }) => (
              <FormStepper>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <Field fullWidth name="firstname" component={TextField} label="First Name" />
                  </Grid>
                  <Grid item md={6}>
                    <Field fullWidth name="lastname" component={TextField} label="Last Name" />
                  </Grid>
                </Grid>
                <FieldArray name="links">
                  {({ push, remove }) => (
                    <Grid container spacing={2} sx={{ marginTop: 2, paddingX: 2 }}>
                      <Grid item xs={12}>
                        <Typography variant="h6" component="h2">
                          Add Social Links
                        </Typography>
                      </Grid>
                      {values.links.map((_, index) => (
                        <>
                          <Grid item md={5}>
                            <Field fullWidth name={`links.${index}.linkname`} component={TextField} label="Link Name" />
                          </Grid>
                          <Grid item md={5}>
                            <Field fullWidth name={`links.${index}.linkurl`} component={TextField} label="Link URL" />
                          </Grid>
                          {index > 0 && (
                            <Grid item md={2}>
                              <Button variant="outlined" color="error" onClick={() => remove(index)}>
                                Delete
                              </Button>
                            </Grid>
                          )}
                        </>
                      ))}{" "}
                      <Grid item xs={12}>
                        <Button variant="outlined" onClick={() => push(linksGroup)}>
                          Add Link
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </FieldArray>
              </FormStepper>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;
