import { ButtonLink, Container } from "@/components/ui";
import { LogoMark } from "@/components/logo";

export default function NotFound() {
  return (
    <Container className="flex min-h-[62vh] flex-col items-center justify-center py-24 text-center">
      <LogoMark className="h-12 w-12 text-stone" />
      <p className="eyebrow mt-10">Error 404</p>
      <h1 className="mt-6 max-w-xl text-[2.25rem] leading-[1.12] sm:text-[3rem]">
        This one is not in the workshop
      </h1>
      <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-[1.8] text-graphite">
        The page you were looking for has been moved or never existed. The collection is a good
        place to pick the thread back up.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ButtonLink href="/products">View the collection</ButtonLink>
        <ButtonLink href="/" tone="outline">
          Back to home
        </ButtonLink>
      </div>
    </Container>
  );
}
