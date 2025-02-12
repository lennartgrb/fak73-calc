import { Hono } from "hono";

export const calculator = new Hono();

let state = 0;

calculator.get("/add", (c) => {
  const { y } = c.req.query();
  if (!y || isNaN(parseInt(y))) return c.json({ error: "No y provided" }, 400);

  state = state + parseInt(y);

  return c.json({
    result: state,
  });
});

// reset-route
calculator.get("/reset", (c) => {
  state = 0;

  return c.json({
    result: state,
  });
});

// stateless-add-route
calculator.get("/stateless-add", (c) => {
  const { x, y } = c.req.query();
  if (!y || isNaN(parseInt(y)) || !x || isNaN(parseInt(x))) return c.json({ error: "No y provided" }, 400);

  return c.json({
    result: parseInt(y) + parseInt(x),
  });
});

// crash-route
