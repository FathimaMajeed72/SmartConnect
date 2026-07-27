import { Link } from "react-router-dom";

import Container from "@/shared/components/Container";
import { Button } from "@/shared/ui/button";

export default function Hero() {
  return (
    <section className="bg-background py-20">
      <Container>
        <div className="flex flex-col-reverse items-center gap-16 lg:flex-row">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              Smart School Management
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Connecting
              <span className="text-primary"> Schools</span>,
              <br />
              Teachers & Parents
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Manage attendance, communication, meetings, academic
              performance, and student safety from one centralized platform.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Login
                </Button>
              </Link>

              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-1 justify-center">
            <div className="flex h-80 w-80 items-center justify-center rounded-3xl border bg-slate-50 shadow-sm">
              <div className="text-center">
                <div className="text-7xl"><img src="" alt="" /></div>

                <p className="mt-4 text-sm text-muted-foreground">
                  School Illustration
                  {/* <br />
                  (Coming Soon) */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}