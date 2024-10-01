import { query } from "express";
import { prisma } from "../../../app.js";

export const addShoe = async (req, res, next) => {
  const { size, color, category, price, brand, name, pictures, units } =
    req.body;
  const userId = req.user.id;
  try {
    const shoe = await prisma.shoes.create({
      data: {
        size,
        category,
        color,
        price,
        brand,
        name,
        units,
        pictures,
        userId,
      },
    });
    res.status(201).json(shoe);
  } catch (err) {
    next(err);
  }
};

export const getAllShoes = async (req, res, next) => {
  try {
    const shoes = await prisma.shoes.findMany();
    res.status(200).json({ message: "Successful", shoes });
  } catch (err) {
    next(err);
  }
};

export const getShoeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const shoe = await prisma.shoes.findUnique({ where: { id } });
    res.status(200).json({ message: "Success", shoe });
  } catch (err) {
    next(err);
  }
};

export const getAllShoesBySeller = async (req, res, next) => {
  const { id } = req.user;
  try {
    const shoes = await prisma.shoes.findMany({ where: { userId: id } });
    res.status(200).json({ message: "Successful", shoes });
  } catch (err) {
    next(err);
  }
};

export const getOneSellerShoe = async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  try {
    const shoes = await prisma.shoes.findMany({
      where: { userId: userId, id },
    });
    res.status(200).json({ message: "Successful", shoes });
  } catch (err) {
    next(err);
  }
};

export const updateShoe = async (req, res, next) => {
  const { id } = req.params;
  const { pictures, size, color, price, units } = req.body;
  try {
    const shoeExist = await prisma.shoes.findUnique({ where: { id } });
    if (!shoeExist) {
      res.status(404).json({ message: "Shoe does not exist" });
    }
    const shoe = await prisma.shoes.update({
      where: { id },
      data: {
        pictures,
        price,
        size,
        units,
        color,
      },
    });
    res.status(200).json(shoe);
  } catch (err) {
    next(err);
  }
};

export const deleteShoe = async (req, res, next) => {
  const { id } = req.params;

  try {
    const shoeExist = await prisma.shoes.findUnique({ where: { id } });
    if (!shoeExist) {
      res.status(404).json({ message: "Shoe does not exist" });
    }
    const shoes = await prisma.shoes.delete({ where: { id } });
    res.status(200).json(shoes);
  } catch (err) {
    next(err);
  }
};

export const searchShoe = async (req, res, next) => {
  const { query } = req.query;
  try {
    const shoe = await prisma.shoes.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
            brand: {
              contains: query,
              mode: "insensitive",
            },
            category: {
              contains: query,
              mode: "insensitive",
            },
            size: {
              contains: query,
              mode: "insensitive",
            },
            price: {
              contains: query,
              mode: "insensitive",
            },
            color: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    res.status(200).json(shoe);
  } catch (err) {
    next(err);
  }
};
