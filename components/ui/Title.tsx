interface MyTitleProps {
  //title: string;
}

export default function Title({}: MyTitleProps) {
  return (
    <a href="/" className="flex items-center no-underline">
      <div className="beige-block">
        <h1
          className="text-steel-azure text-2xl tracking-widest uppercase font-bold"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "0.2em", }}
        >
          tandem
        </h1>
      </div>
    </a>
  );
}