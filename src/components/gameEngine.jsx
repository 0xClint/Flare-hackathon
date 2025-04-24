// GameComponent.jsx
import { useEffect, useRef } from "react";
import { Engine, Actor, Color, Rectangle } from "excalibur";

export default function GameEngine() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const engine = new Engine({
      canvasElement: canvasRef.current,
      width: 800,
      height: 600,
      antialiasing: false,
    });

    // Create player actor
    const player = new Actor({
      pos: engine.screen.center,
      width: 50,
      height: 50,
    });

    player.graphics.use(
      new Rectangle({
        width: 50,
        height: 50,
        color: Color.Red,
      })
    );

    engine.add(player);
    engine.start();

    return () => {
      engine.stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        margin: "0 auto",
        border: "1px solid black",
      }}
    />
  );
}
