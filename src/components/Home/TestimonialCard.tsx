import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Col } from "react-bootstrap";
import type { Testimonial } from "@/types/index.types";



interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
    const path = usePathname();
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "/images/home/5stars.hyperesources/5stars_hype_generated_script.js";
        script.async = true;

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [path]);

    return (
        <Col sm={6}>
            <div className='text-center mb-3 mb-md-5'>
                <h5 className='italic font-normal line-height-md'>{testimonial.text}</h5>
                <p className='my-3 font-bold text-md'>{testimonial.author}</p>
                <div
                    id="5stars_hype_container"
                    className="HYPE_document"
                    style={{
                        margin: "1rem auto",
                        position: "relative",
                        width: "217px",
                        height: "31px",
                        overflow: "hidden",
                        gridArea: "16 / 3 / 17 / 4",
                    }}
                ></div>
            </div>
        </Col>
    );
}

export default TestimonialCard;
