
import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Lydia Grant",
    text: "Aivora Digitals completely transformed our online presence. I found their AI integration particularly impressive.",
    avatar: "https://i.pravatar.cc/150?u=1",
    star: [1,2,3,4,5]
  },
  {
    name: "James Anderson",
    text: "The team is incredibly responsive. Their monthly maintenance model was perfect for our startup to scale efficiently.",
    avatar: "https://i.pravatar.cc/150?u=2",
    star: [1,2,3,4]
  },
  {
    name: "Sofia Martinez",
    text: "The website they built is AI-integrated, clean, fast, and conversion-focused. The structure and automation work seamlessly to capture quality leads, delivering a truly professional experience.",
    avatar: "https://i.pravatar.cc/150?u=3",
    star: [1,2,3,4]
  }
];

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="text-center mb-16">
        
        <h3 className="text-4xl text-gray-500 md:text-5xl font-black">Words that <span className="text-blue-500">Define Our Work</span></h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <div key={idx} className="p-10 rounded-3xl bg-slate-900/80 border border-slate-800 relative">
            <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-500/20" />
            <div className="flex mb-6">
              {review.star.map((_, i) => (
                <Star key={i} className="w-4 h-4 text-blue-400 fill-blue-400" />
              ))}
            </div>
            <p className="text-slate-300 text-lg italic mb-10 leading-relaxed">
              `{review.text}`
            </p>
            <div className="flex items-center space-x-4">
              <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500/30" />
              <div>
                <h5 className="font-bold text-gray-400">{review.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
