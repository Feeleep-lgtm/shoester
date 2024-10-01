import { prisma } from "../../../app.js";

export const addToCart = async (req, res, next) => {
  const { shoesId } = req.body;

  const userId = req.user.id;
  console.log(
    "it works, the code below this line should also work",
    userId,
    shoesId
  );

  try {
    const shoeExist = await prisma.cart.findFirst({
      where: { shoesId, userId },
    });
    if (shoeExist) {
      res.status(400).json({ message: "This shoe is already in your cart" });
    }
    const addShoe = await prisma.cart.create({
      data: {
        shoesId,
        userId,
      },
    });
    res.status(200).json(addShoe.shoesId);
  } catch (err) {
    next();
  }
};

export const checkout = async (req, res, next) => {
  //const shoe = req.user.cart;
  try {
    const checkout = await prisma.cart.findMany({
      include: {
        shoe: true,
      },
    });
    res.status(200).json(checkout);
  } catch (err) {
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteShoe = await prisma.cart.delete({ where: { id } });
    res.status(200).json({ message: "Shoe removed from cart", deleteShoe });
  } catch (err) {
    next(err);
  }
};
