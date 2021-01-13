<template>
  <!-- Add some ionic markup... -->
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbar-md-primary">
        <ion-title>Ionic Nuxt App</ion-title>
      </ion-toolbar>
    </ion-header>
    <Logo />
    <ion-content class="content">
      <ion-card>
        <ion-card-subtitle>Be more productive!</ion-card-subtitle>
        <ion-card-title>Value Factory</ion-card-title>
        <ion-card-content>
          <h1>Hello World</h1>
        </ion-card-content>
        <ion-button @click="$router.push('/board')"> Board!!!!! </ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
export default {}
</script>
