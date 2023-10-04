<script>
  import People from "../lib/People.svelte";
import Header from "../lib/Header.svelte";
  import Footer from "../lib/Footer.svelte";

</script>
<div class="mx-16">
    <Header />
<h2 class="text-4xl text-primary font-semibold my-36">
    About Us
</h2>
<p class="font-poppins text-2xl">
    Nutrients, vitamins and minerals are required by the human body in order to prevent diseases. Nutritional diseases occur when a body lacks proper amount of nutrients which can lead to multiple health problems. Excess or deficiencies of nutrients in the diet or eating disorder can lead to many catastrophic diseases such as diabetes, coeliac disease, Hypothyroidism, etc. A common example of nutritional deficiency is the lack of Protein. It is also known as Malnutrition. It is important for building and repairing tissues, producing enzymes and hormones, and supporting immune function. Therefore, in such condition it becomes very necessary to maintain a proper diet. A correct and balanced diet would allow the body to get the required amount of nutrients, vitamins, and minerals in order to work effectively. The paper is the framework that provides a proper diet plan to the user.
</p>

    <p class="font-poppins text-2xl mt-10">

F4H is multiple disease-based diet recommendation system that provides a diet plan as output by taking all the relevant health related information as input. Our system can be used an effective tool in order to improve nutritional intake as well as to maintain and improve from the health conditions.
</p>

<h5 class="font-poppins font-semibold text-black text-5xl mt-40 mb-12">
    Our Mentor
</h5>

<People name="Dr. Anuj Bharti" link="https://www.linkedin.com/in/dr-anuj-bharti-a0309367/" src="../assets/anuj.svg"  />

<h5 class="font-poppins font-semibold text-black text-5xl mt-40 mb-12">
    Our Team
</h5>
<div class="flex w-full justify-between">
<People name="Darsh Kumar" link="https://www.linkedin.com/in/darsh-kumar" src="../assets/Darsh.svg" />
<People name="Aniket Singh" link="https://www.linkedin.com/in/aniket-singh-135a841bb" src="../assets/Aniket.svg" />
<People name="Pranav Saini" link="https://www.linkedin.com/in/pranav-saini/"  src="../assets/Pranav.svg"/>
</div>
<Footer/>
</div>

<!-- [kacl, g, g, g, g, g, mg, mg, g, mg, mg, mg, mg, IU, mg, mg, mg, mcg] -->