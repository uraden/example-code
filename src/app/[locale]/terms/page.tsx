import React from "react";
import { Divider } from "antd";

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="mt-10 mx-12">
      <h1 className="text-3xl	">Terms and Conditions</h1>
      <br />

      <div className="text-gray-500">
        <h2 className="text-xl">
          Read about the terms and conditions for SignatureSend.
        </h2>
        <Divider />

        <h2 className="text-xl text-gray-950 mb-3">1. Introduction</h2>
        <p>
          These terms and conditions govern your use of the subscription-based
          delivery service offered by SignatureSend, hereafter referred to as
          `the Service Provider.`
        </p>
        <p>
          By subscribing to our service, you agree to abide by these terms and
          conditions in their entirety. Please read these terms carefully before
          subscribing. If you do not agree with any part of these terms, you may
          not use our service.
        </p>

        <h2 className="text-xl text-gray-950 my-3">2. Subscription</h2>
        <p>
          2.1 By subscribing to our service, you agree to pay the subscription
          fee specified at the time of purchase.
        </p>
        <p>
          2.2 Subscription fees are non-refundable unless otherwise stated in
          these terms.
        </p>
        <p>
          2.3 Subscriptions are billed on a recurring basis according to the
          billing cycle chosen at the time of subscription (e.g., monthly,
          quarterly, annually).
        </p>
        <p>
          2.4 The Service Provider reserves the right to change subscription
          fees with prior notice.
        </p>

        <h2 className="text-xl text-gray-950 my-3">3. Delivery</h2>
        <p>
          3.1 The Service Provider will deliver the subscribed products or
          services to the address provided by the subscriber.
        </p>
        <p>
          3.2 Delivery times may vary depending on factors such as location and
          product availability.
        </p>
        <p>
          3.3 The subscriber is responsible for providing accurate and
          up-to-date delivery information. The Service Provider is not liable
          for any delays or non-delivery arising from incorrect or incomplete
          information provided by the subscriber.
        </p>
        <p>
          3.4 Delivery may be subject to additional charges, taxes, or customs
          duties depending on the delivery location. These charges are the
          responsibility of the subscriber.
        </p>

        <h2 className="text-xl text-gray-950 my-3">4. Cancellation and Termination</h2>
        <p>
          4.1 Subscribers may cancel their subscription at any time through
          their account settings or by contacting customer support.
          However, if you cancel your subscription 3 days before the next delivery date, you will still receive the next delivery.
        </p>
        <p>
          4.2 Cancellation requests must be received before the next billing
          cycle to avoid being charged for the following period.
        </p>
        <p>
          4.3 The Service Provider reserves the right to terminate or suspend
          subscriptions at any time without prior notice if the subscriber
          violates these terms or engages in fraudulent or abusive behavior.
        </p>

        <h2 className="text-xl text-gray-950 my-3">5. Refunds</h2>
        <p>
          5.1 Refunds will only be issued in accordance with our refund policy,
          which may vary depending on the product or service subscribed to.
        </p>
        <p>
          5.2 Refunds, if applicable, will be processed using the same payment
          method used for the original transaction.
        </p>

        <h2 className="text-xl text-gray-950 my-3">6. Changes to Terms</h2>
        <p>
          6.1 The Service Provider reserves the right to modify or update these
          terms and conditions at any time without prior notice.
        </p>
        <p>
          6.2 Subscribers will be notified of any changes to these terms via
          email or through their account dashboard.
        </p>
        <p>
          6.3 Continued use of the service after changes to the terms constitute
          acceptance of the modified terms.
        </p>

        <h2 className="text-xl text-gray-950 my-3">7. Limitation of Liability</h2>
        <p>
          7.1 The Service Provider shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, including but
          not limited to loss of profits, revenue, or data, arising out of or in
          connection with the use of the service.
        </p>
        <p>
          7.2 The total liability of the Service Provider, whether in contract,
          warranty, tort (including negligence), or otherwise, shall not exceed
          the total amount paid by the subscriber for the subscription.
        </p>

        <h2 className="text-xl text-gray-950 my-3">8. Governing Law</h2>
        <p>
          8.1 These terms and conditions shall be governed by and construed in
          accordance with the laws of [Jurisdiction], without regard to its
          conflict of law provisions.
        </p>

        <h2 className="text-xl text-gray-950 my-3">9. Contact Information</h2>
        <p>
          If you have any questions about these terms and conditions, please
          contact us at [Contact Email/Phone Number].
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
