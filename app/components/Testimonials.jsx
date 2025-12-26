
import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "James Anderson",
    role: "CEO, TechFlow",
    text: "Aivora Digitals completely transformed our online presence. Our conversion rates jumped by 140% within the first two months.",
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    name: "Lydia Grant",
    role: "Founder, Bloomly",
    text: "The team is incredibly responsive. Their monthly maintenance model is perfect for us as we scale rapidly.",
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    name: "Robert King",
    role: "Marketing Director, Zenth",
    text: "Best decision for our digital ads. They found audiences we didn't even know we had.",
    avatar: "https://i.pravatar.cc/150?u=3"
  }
];

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">Client Love</h2>
        <h3 className="text-4xl md:text-5xl font-black">Trusted by <span className="text-blue-400">500+ Businesses</span></h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <div key={idx} className="p-10 rounded-3xl bg-slate-900/80 border border-slate-800 relative">
            <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-500/20" />
            <div className="flex mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-blue-400 fill-blue-400" />
              ))}
            </div>
            <p className="text-slate-300 text-lg italic mb-10 leading-relaxed">
              `{review.text}`
            </p>
            <div className="flex items-center space-x-4">
              <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500/30" />
              <div>
                <h5 className="font-bold">{review.name}</h5>
                <p className="text-sm text-slate-500">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
