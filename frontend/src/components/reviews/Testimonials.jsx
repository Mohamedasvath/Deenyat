import React from "react";

const reviews = [
  {
    id: 1,
    name: "Amina Rahman",
    position: "Teacher",
    review:
      "Excellent quality Islamic products! The Qur’ans and books arrived quickly and in perfect condition. Highly recommended.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Ahmed Khan",
    position: "Entrepreneur",
    review:
      "Very satisfied with the service. The prayer mats and accessories are beautiful and authentic. Will shop again!",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Fatima Noor",
    position: "Designer",
    review:
      "Lovely experience! The website is easy to navigate and the products are top quality. Elegant and trustworthy.",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 md:px-16 bg-gray-600 from-[#2a9437] via-[#023436] to-[#000000] text-white">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 drop-shadow-lg">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transition-transform hover:scale-105"
          >
            <img
              src={review.avatar}
              alt={review.name}
              className="w-20 h-20 rounded-full mb-4 border-2 border-yellow-400 shadow-md"
            />
            <h3 className="text-xl font-semibold text-yellow-300 mb-1">
              {review.name}
            </h3>
            <p className="text-gray-200 italic mb-4">{review.position}</p>
            <p className="text-gray-100 leading-relaxed">{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
