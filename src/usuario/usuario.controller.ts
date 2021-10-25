import { Request, Response } from 'express'
import Usuario from './usuario.model'

export const getUsuarios = async (req:Request, res:Response) => {
  const usuarios = await Usuario.findAll()
  res.json({
    msg: 'getUsuarios',
    usuarios
  })
}
export const getUsuario = async (req:Request, res:Response) => {
  try {
    const { id } = req.params
    const usuario = await Usuario.findByPk(id)
    if (!usuario) throw new Error(`No existe el usuario con este id ${id}`)
    res.json({
      msg: 'getUsuarios',
      usuario
    })
  } catch (error) {
    res.status(400).json({
      msg: `${error}`
    })
  }
}
export const postUsuario = async (req:Request, res:Response) => {
  const { body } = req
  try {
    const exsiteEmail = await Usuario.findOne({
      where: {
        email: body.email
      }
    })
    if (exsiteEmail) {
      return res.status(400).json({
        msg: 'Email ya existe en la bd'
      })
    }
    const usuario = await Usuario.create(body)

    if (!usuario) {
      return res.status(400).json({
        msg: 'Error al crear usuario'
      })
    }
    res.status(200).json({
      msg: 'postUsuarios',
      usuario
    })
  } catch (error) {
    res.status(500).json({
      msg: 'hable con el admnistrador'
    })
  }
}
export const putUsuario = async (req:Request, res:Response) => {
  const { id } = req.params//eslint-disable-line
  const { body } = req
  try {
    const exsiteEmail = await Usuario.findOne({
      where: {
        email: body.email
      }
    })
    if (exsiteEmail) {
      return res.status(400).json({
        msg: 'Email ya existe en la bd'
      })
    }

    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      return res.status(400).json({
        msg: `No existe un usuario con el id ${id}`
      })
    }

    await usuario.update(body)

    res.status(200).json({
      msg: 'putUsuarios',
      usuario
    })
  } catch (error) {
    res.status(500).json({
      msg: 'hable con el admnistrador'
    })
  }
}
export const deleteUsuario = async (req:Request, res:Response) => {
  const { id } = req.params

  const usuario = await Usuario.findByPk(id)
  if (!usuario) {
    return res.status(400).json({
      msg: `No existe un usuario con el id ${id}`
    })
  }

  await usuario.update({ estado: false })

  res.json({
    msg: 'deleteUsuarios',
    usuario
  })
}
