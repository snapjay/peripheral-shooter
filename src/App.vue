<template>
  <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
          <b-navbar-brand href="#">Peripheral Shooter</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                  <b-nav-item to="/">Moderator</b-nav-item>
                  <b-nav-item :to='{name: "client", params:{id: "LEFT"}}'>Left</b-nav-item>
                  <b-nav-item :to='{name: "client", params:{id: "RIGHT"}}'>Right</b-nav-item>
              </b-navbar-nav>
          </b-collapse>
      </b-navbar>
    <b-container  id="app">
      <b-row>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
