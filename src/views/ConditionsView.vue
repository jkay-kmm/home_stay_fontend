<template>
  <div class="conditions-page">
    <div class="hero-section">
      <h1>Conditions & Terms</h1>
      <p>Please read our terms and conditions carefully</p>
    </div>

    <div class="content-container">
      <div class="terms-content">
        <section class="terms-section">
          <h2>1. General Terms</h2>
          <p>
            Welcome to Sunset Hotel Grand. These terms and conditions outline the rules and
            regulations for the use of our hotel services and facilities.
          </p>
          <p>
            By booking a room or using our services, you accept these conditions in full. Do not use
            our services if you do not accept all of these conditions.
          </p>
        </section>

        <section class="terms-section">
          <h2>2. Reservations and Booking</h2>
          <ul>
            <li>
              All reservations are subject to availability and confirmation by Sunset Hotel Grand.
            </li>
            <li>
              Room rates are quoted per room per night and are subject to change without prior
              notice.
            </li>
            <li>A valid credit card is required to guarantee your reservation.</li>
            <li>
              Special requests (such as room type, floor preference) are not guaranteed and are
              subject to availability.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>3. Check-in and Check-out</h2>
          <ul>
            <li><strong>Check-in time:</strong> 2:00 PM</li>
            <li><strong>Check-out time:</strong> 12:00 PM</li>
            <li>
              Early check-in and late check-out are subject to availability and may incur additional
              charges.
            </li>
            <li>Valid photo identification is required upon check-in.</li>
            <li>The person checking in must be 18 years of age or older.</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>4. Payment Policy</h2>
          <ul>
            <li>Payment is due at the time of check-in unless otherwise arranged.</li>
            <li>We accept major credit cards, cash, and bank transfers.</li>
            <li>
              Additional charges may apply for services such as room service, laundry, or telephone
              calls.
            </li>
            <li>All charges will be clearly itemized on your final bill.</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>5. Cancellation Policy</h2>
          <ul>
            <li>Cancellations must be made at least 24 hours before the scheduled arrival date.</li>
            <li>
              Late cancellations or no-shows may result in a charge equivalent to one night's stay.
            </li>
            <li>
              Peak season and special event bookings may have different cancellation policies.
            </li>
            <li>Group bookings (10+ rooms) require special cancellation terms.</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>6. Hotel Policies</h2>
          <ul>
            <li>Smoking is prohibited in all guest rooms and indoor public areas.</li>
            <li>Pets are not allowed unless specifically designated as service animals.</li>
            <li>
              The hotel reserves the right to refuse service to anyone who violates hotel policies.
            </li>
            <li>Guests are responsible for any damage to hotel property during their stay.</li>
            <li>The hotel is not responsible for personal belongings left in guest rooms.</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>7. Liability and Safety</h2>
          <p>
            Sunset Hotel Grand strives to provide a safe and secure environment for all guests.
            However, the hotel cannot be held liable for:
          </p>
          <ul>
            <li>Loss, theft, or damage to personal property</li>
            <li>Injury or accident not directly caused by hotel negligence</li>
            <li>Disruption of services due to circumstances beyond our control</li>
            <li>Acts of nature, government regulations, or force majeure events</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>8. Privacy and Data Protection</h2>
          <p>
            We respect your privacy and are committed to protecting your personal information.
            Please refer to our Privacy Policy for detailed information about how we collect, use,
            and protect your data.
          </p>
        </section>

        <section class="terms-section">
          <h2>9. Changes to Terms</h2>
          <p>
            Sunset Hotel Grand reserves the right to modify these terms and conditions at any time.
            Updated terms will be posted on our website and will take effect immediately upon
            posting.
          </p>
        </section>

        <section class="terms-section">
          <h2>10. Contact Information</h2>
          <p>If you have any questions about these terms and conditions, please contact us:</p>
          <div class="contact-info">
            <p><strong>Sunset Hotel Grand</strong></p>
            <p>No. 167 Mai Dich, Cau Giay, Hanoi, Vietnam</p>
            <p>Phone: +84 242 2420 777</p>
            <p>Email: info@sunsethotel.com</p>
          </div>
        </section>

        <div class="last-updated">
          <p><em>Last updated: October 29, 2025</em></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Terms and conditions page
</script>

<style scoped>
.conditions-page {
  padding: 40px 20px;
  min-height: 100vh;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #8b4513;
  margin-bottom: 10px;
}

.hero-section p {
  font-size: 1.2rem;
  color: #666;
}

.content-container {
  max-width: 900px;
  margin: 0 auto;
}

.terms-content {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.terms-section {
  margin-bottom: 40px;
}

.terms-section h2 {
  color: #8b4513;
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.terms-section p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 15px;
}

.terms-section ul {
  color: #555;
  line-height: 1.8;
  padding-left: 20px;
}

.terms-section li {
  margin-bottom: 10px;
}

.contact-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 15px;
}

.contact-info p {
  margin-bottom: 8px;
  color: #333;
}

.last-updated {
  text-align: center;
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid #e0e0e0;
}

.last-updated p {
  color: #888;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .terms-content {
    padding: 25px 20px;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .terms-section h2 {
    font-size: 1.3rem;
  }
}
</style>
