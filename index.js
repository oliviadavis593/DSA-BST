/* Implementing a binary search tree */
/* About BST:
1. Each node in a BST holds a key, value, left & right pointers
2. Each node has a parent - unless its the root node 
3. if key is > than root or specific child than it goes to the right - vice versa for the left 
4. BST support 3 fundamental operations: insert, remove, find
*/

/* class BinarySearchTree:
1. class represents a single node in the tree 
2. you can optionally pass in a key, value, & a pointer to the parent node 
3. if key prop is null => object represents an empty tree 
4. if parent pointer is null => then you're dealing w. a root node 
5. the node starts w. the left & right pointers to their child nodes being null 
*/
class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key; 
        this.value = value; 
        this.parent = parent; 
        this.left = left; 
        this.right = right; 
    }

    /* Insertion  */
    //if there's no existing tree => root of the tree will be the 1st item we insert
    //if we start w. existing tree => have to find right place for item that we want to insert & then insert it
    /*Big O: 
    1. Worst case O(n): when tree skews either left or right 
        - a skewed BST is basically a Linked List 
        - so you'd need to iterate through each one of those nodes in order to get to bottom of tree to insert something
    2. Best case O(1): would be inserting root only 
    */
    insert(key, value) {
        //if the tree is empty => then key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key; 
            this.value = value; 
        }
        //if tree already exists => start at the root & compare it to key you want to insert
        //if new key is less than node's key then new node need to live in the left-hand branch
        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                //if node has existing left child => recursively call `insert` method
                //so node is added futher down the tree
                this.left.insert(key, value);
            }
        }
        //if new key is > than nodes' key => put it on the right side 
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value)
            }
        }
    }

    /* Retrieval  */
    //Same concept as insertion 
    /*Big O:
    1. Average O(log(n)): requires traversing the height of a balance tree
    2. Worst case O(n): the tree is skewed left or right & you're searching for node at bottom where everything inserted to 1 side
    3. Best case O(1): node you're trying to find  is the root node 
    */
    find(key) {
        //if item is foudn at root => return that value
        if (this.key == key) {
            return this.value; 
        }
        //if item you're looking for is < than root => follow the left child 
        //if there's an existing left child => recursively check its left &/or right child until you find item'
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        //if item you're looking for is > => follow right child 
        //if there's an existing right child => recursively check its left &/or right child until you find item
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        //You've search the tree & the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }

    /* Removal */
    //After you remove the item you'd want to remove the find process 
    /*3 scenarios that you may encounter:
    1. no children (a leaf node) => simplest case of removal (detach node from parent)
    2. 1 child (left or right, doesn't matter) => 
    3. 2 children (left & right)
    */
   /*Big O:
   1. Best case O(1) => you can use simliar logic to insertion & removal 
   2. Average case O(log(n))
   3. Worst case: O(n)
   */
   remove(key) {
       if (this.key == key) {
           if (this.left && this.right) {
               const successor = this.right._findMin()
               this.key = successor.key; 
               this.value = successor.key; 
               successor.remove(successor.key)
           }
           //if node only has a left child => you'd replace the node with its left child
           else if (this.left) {
               this.replaceWith(this.left);
           }
           //if node only has right child => you'd replce the node with its right child 
           else if (this.right) {
               this.replaceWith(this.right);
           }
           //if node has no children => remove it & any references to it by calling replaceWith(null)
           else {
               this._replaceWith(null);
           }
       }
       else if (key < this.key && this.left) {
           this.left.remove(key);
       }
       else if (key > this.key && this.right) {
           this.right.remove(key);
       }
       else {
           throw new Error('Key Error')
       }
   }

   _removalWith(node) {
       if (this.parent) {
           if (this == this.parent.left) {
               this.parent.left = node; 
           }
           else if (this == this.parent.right) {
               this.parent.right = node; 
           }
           if (node) {
               node.parent = this.parent; 
           }
       }
       else {
           if (node) {
               this.key = node.key; 
               this.value = node.value; 
               this.left = node.left; 
               this.right = node.right; 
           }
           else {
               this.key = null; 
               this.value = null; 
               this.left = null; 
               this.right = null; 
           }
       }
   }

   _findMin() {
       if (!this.left) {
           return this; 
       }
       return this.left._findMin();
   }
}
