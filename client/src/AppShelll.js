const AppShell = () => {
  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={Homepage} />
            <Navbar />
            <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/data" component={Data} />
            </Switch>
            </section>
          </Fragment>
    </Router>
);
}
