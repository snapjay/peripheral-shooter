<template>
  <div class="h-100">
      <b-navbar toggleable="lg" type="dark" variant="primary">
          <b-navbar-brand :to="{name:'Home'}">Peripheral Shooter</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                  <b-nav-item :to='{name: "Home"}'>Home</b-nav-item>
                  <b-nav-item :to='{name: "Moderator"}'>Moderator</b-nav-item>
                  <b-nav-item :to='{name: "Client", params:{view: "LEFT"}}'>Left</b-nav-item>
                  <b-nav-item :to='{name: "Client", params:{view: "RIGHT"}}'>Right</b-nav-item>
              </b-navbar-nav>
          </b-collapse>
      </b-navbar>
    <b-container fluid class="h-100" id="app">
      <b-row class="h-100">
        <b-col class="h-100 p-0">
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
