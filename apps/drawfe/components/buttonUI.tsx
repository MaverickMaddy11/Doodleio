export function Navbut({ txt, fun }: { txt: string; fun: () => void }) {
  return (
    <div>
      <button
        className="m-3"
        onClick={() => {
          fun();
        }}
      >
        {txt}
      </button>
    </div>
  );
}
