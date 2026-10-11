export type RobotGesture = "thinking" | "heart" | "dance" | "thumbsup" | null;

/** Mini-robô do cabeçalho do chat, desenhado em CSS. */
export function HazeRobot({ gesture }: { gesture: RobotGesture }) {
  return (
    <div className={gesture ? `haze-robot gesture-${gesture}` : "haze-robot"} aria-hidden="true">
      <div className="hr-head">
        <div className="hr-antenna" />
        <div className="hr-face">
          <div className="hr-eyes">
            <div className="hr-eye" />
            <div className="hr-eye" />
          </div>
          <div className="hr-mouth" />
        </div>
      </div>
      <div className="hr-body">
        <div className="hr-chest" />
      </div>
      <div className="hr-arm hr-arm-left">
        <div className="hr-forearm-left">
          <div className="hr-hand hr-hand-left" />
        </div>
      </div>
      <div className="hr-arm hr-arm-right">
        <div className="hr-forearm-right">
          <div className="hr-hand hr-hand-right" />
        </div>
      </div>
      <div className="hr-legs">
        <div className="hr-leg" />
        <div className="hr-leg" />
      </div>
    </div>
  );
}
