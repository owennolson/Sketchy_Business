import React, { useState } from "react";
import { useStoreContext } from '../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';

function SellArt() {
    const [formState, setFormState] = useState({name: '', 
    image: '', 
    artist: '',
    price: '',
    quantity: '',
    description: '',
    category: ''});
    const [addProduct] = useMutation(ADD_PRODUCT);
    const [state, dispatch] = useStoreContext();

    const { categories } = state;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('formState', formState);
        await addProduct({
          variables: {
            name: formState.name,
            image: formState.image,
            artist: formState.artist,
            price: parseFloat(formState.price),
            quantity: parseInt(formState.quantity),
            description: formState.description,
            category: formState.category
          },
        });

      };

      const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'category') {
            const selectedCategory = categories.find(
              (category) => category._id === value
            );
            setFormState((prevState) => ({
              ...prevState,
              category: selectedCategory ? selectedCategory._id : '',
            }));
          } else {
            const { name, value } = event.target;
            setFormState({
              ...formState,
              [name]: value,
            });
          }

      };

  return (
    <>
      <div>
        <h3>What would you like to sell?</h3>
        <form onSubmit={handleFormSubmit}>
          {/* {" "} */}
          <div class="form-group">
            <label for="name" class="h4">
              Title of Artwork:
            </label>
            <input class="rounded" type="text" name="name" id="name" onChange={handleChange} />
          </div>

          <div class="form-group">
            <label for="image" class="h4">
              Image URL:
            </label>
            <input class="rounded" type="text" name="image" id="image" onChange={handleChange} />
          </div>

          <div class="form-group">
            <label for="artist" class="h4">
              Artist's Name:
            </label>
            <input class="rounded" type="text" name="artist" id="artist" onChange={handleChange} />
          </div>

          <div class="form-group">
            <label for="price" class="h4">
              Price:
            </label>
            <input class="rounded" type="text" name="price" id="price" onChange={handleChange} />
          </div>

          <div class="form-group">
            <label for="quantity" class="h4">
              Quantity:
            </label>
            <input class="rounded" type="text" name="quantity" id="quantity" onChange={handleChange} />
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-md-12">
                <label for="description" class="h4">
                  Description:
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <textarea
                  class="form-control rounded"
                  type="text"
                  id="description"
                  name="description"
                  rows="3"
                  cols="60"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div>
            <label for="category">Select Category</label>
                <select id="category" name="category" onChange={handleChange}>
                <option value="">Select Category</option>
                    {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                    ))}
                </select>
            </div>

          </div>
          <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
        </form>
      </div>
    </>
  );
}

export default SellArt;