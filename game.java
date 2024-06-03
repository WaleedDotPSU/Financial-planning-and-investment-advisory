import java.util.Random;
import java.util.Scanner;

public class game 

{

    @SuppressWarnings("unused")
    public static void main(String[] args) 

    {

        // Main objects

        Scanner console = new Scanner(System.in);
        Random rand = new Random();

        // Game variables

        String[] enemies = { "Kobold", "Kobold Warrior", "Kobold Archer", "Kobold Overseer" };
        String[] shopItems = { "Silver Sword", "Steel Sword", "Iron Helmet", "Iron Chestplate", "Iron Boots", "Iron Gauntlets", "Steel Helmet", "Steel Chestplate", "Steel Boots", "Steel Gauntlets", "Illbane" };
        String randomItem = null;

        int enemyAttackDamage = 25;
        int enemyHealth = 0;

        // Boss Variables

        String[] bossList = { "Red Drake" };

        int redDrakeArmor = 20;
        int redDrakeAttack = 75;
        int redDrakeSpecialAttackValue = 200;

        // Player variables

        int playerHealth = 100;
        int playerAttackDamage = 50;
        int initialPlayerAttack = playerAttackDamage;
        int playerArmorValue = 0;

        int numHealthPotions = 5;                                       // How many potions the player will start with.
        int healthPotionEffect = 30;                                    // How much each potion will heal.
        int healthPotionDropChance = 50;                                // Percentage drop from enemies.

        int numStrengthPotions = 0;
        int strengthPotionEffect = (rand.nextInt(3) + 1);               

        int goldDropChance = 75;                                        // Percentage drop of gold from enemies.
        int goldDropAmount;
        int goldAmount = 1000;

        int crimsonSwordDropChance = 25;

        int buyStrengthPotion;
        int buyHealthPotion;

        int illbaneCount = 4;

        boolean running = true;

        System.out.println("Now entering the Kobolds Lair...");

        GAME:
        while(running) 

        {

            System.out.println("-------------------------------------------------");

            String enemy = enemies[rand.nextInt(enemies.length)];       // Enemy Spawning.

            System.out.println("\t# " + enemy + " appears! #\n");

            if ("Kobold".equals(enemy))                                 // Enemy stat setting.

            {

                enemyHealth = rand.nextInt(100) + 50;

                enemyAttackDamage = 25;

            }

            else if ("Kobold Archer".equals(enemy))

            {

                enemyHealth = rand.nextInt(150) + 70;

                enemyAttackDamage = 30;

            }

            else if ("Kobold Warrior".equals(enemy))

            {

                enemyHealth = rand.nextInt(200) + 90;

                enemyAttackDamage = 40;

            }

            else if ("Kobold Overseer".equals(enemy))

            {

                enemyHealth = rand.nextInt(250) + 150;

                enemyAttackDamage = 50;

            }

            while(enemyHealth > 0)

            {
                // Enemy introduction and presentation of options.

                System.out.println("\tYour HP is: " + playerHealth);
                System.out.println("\t" + enemy + "'s HP: " + enemyHealth);
                System.out.println("\n\tWhat would you like to do?");

                // Player options

                System.out.println("\t1. Attack");
                System.out.println("\t2. Drink health potion");
                System.out.println("\t3. Run!");
                System.out.println("\t4. Drink strength potion");

                String input = console.nextLine();

                if (input.equals("1"))

                {

                    int damageDealt = rand.nextInt(playerAttackDamage);
                    int damageTaken = rand.nextInt(enemyAttackDamage) - (playerArmorValue);

                    enemyHealth -= damageDealt;
                    playerHealth -= damageTaken;

                    if (damageTaken <= 0)
                    {

                        damageTaken = rand.nextInt(5) + 5;

                    }

                    System.out.println("\t> You strike the " + enemy + " for " + damageDealt + " damage.");
                    System.out.println("\t> You recieve " + damageTaken + " in retaliation!");

                    if(playerHealth < 1)

                    {

                        System.out.println("\t> You have taken too much damage, you are too weak to go on!");
                        break;

                    }

                }

                else if (input.equals("2"))

                {

                    if(numHealthPotions > 0)
                    {

                        playerHealth += healthPotionEffect;
                        numHealthPotions--;
                        System.out.println("\t> You drink a health potion and recover " + healthPotionEffect + " health!"
                                           + "\n\t> You now have " + playerHealth + " HP."
                                           + "\n\t> You have " + numHealthPotions + " health potions left.\n)");

                    }

                    else
                    {

                        System.out.println("\t> You have no health potions left! ");

                    }

                }

                else if (input.equals("3"))

                {

                    System.out.println("\tYou run away from the " + enemy + "!");
                    continue GAME; 

                }

                else if (input.equals("4"))

                {

                    int playerAttack = playerAttackDamage;

                    if (numStrengthPotions > 0)

                    playerAttackDamage = playerAttack * strengthPotionEffect;
                    numStrengthPotions--;

                    System.out.println("You drank a strength potion and your attack has multiplied by: " + strengthPotionEffect + " time(s).!");

                }


                else

                {

                    System.out.println("\tInvalid command...");

                }

            }

            if (playerHealth < 1)

            {

                System.out.println("\n\tYou crawl out of the dungeon to live and fight another day.");
                break;

            }

            System.out.println("-------------------------------------------------");
            System.out.println(" # " + enemy + " was defeated! #");
            System.out.println(" # You have " + playerHealth + " HP left. #");

            playerAttackDamage = initialPlayerAttack;

            if(rand.nextInt(100) < healthPotionDropChance)          // Health Potion drop chance; differs from enemy to enemy.

            {

                if ("Kobold Archer".equals(enemy))

                {

                    healthPotionDropChance = 55;

                }

                else if ("Kobold Warrior".equals(enemy))

                {

                    healthPotionDropChance = 60;

                }

                else if ("Kobold Overseer".equals(enemy))

                {

                    healthPotionDropChance = 75;

                }

                numHealthPotions++;

                System.out.println(" # The " + enemy + " dropped a health potion! # ");
                System.out.println(" # You have " + numHealthPotions + " health potion(s). # ");

            }

            if(rand.nextInt(100) < goldDropChance)          // Gold drop chance; also differs from enemy to enemy.

            {

                if ("Kobold Archer".equals(enemy))

                {

                    goldDropChance = 55;

                }

                else if ("Kobold Warrior".equals(enemy))

                {

                    goldDropChance = 60;

                }

                else if ("Kobold Overseer".equals(enemy))

                {

                    goldDropChance = 75;

                }

                goldDropAmount = rand.nextInt(500) + 1;
                goldAmount += goldDropAmount;

                System.out.println(" # The " + enemy + " dropped " + goldDropAmount + " gold! #");
                System.out.println(" # You now have " + goldAmount + " gold. #");

            }

            System.out.println("-------------------------------------------------");            
            System.out.println("What to do now?");          // Next set of options;
            System.out.println("1. Continue fighting");     // 1. Resets loop, keeps progress.
            System.out.println("2. Exit dungeon");          // 2. Breaks loop, progress lost; game over.
            System.out.println("3. Visit the shop");        // 3. Triggers shop sequence.
            System.out.println("4. Sacrifice Illbane...");  // 4. Triggers hard battle.

            String input = console.nextLine();


            while(!input.equals("1") && !input.equals("2") && !input.equals("3") && !input.equals("4"))
            {

                System.out.println("Invalid command...");
                input = console.nextLine();

            }

            if (input.equals("1"))

            {

                System.out.println("You continue on your trek through the dungeon.");

                continue GAME;

            }

            else if (input.equals("2"))

            {

                System.out.println("You exit the dungeon.");
                break;

            }

            else if (input.equals("4") && illbaneCount >= 4)        // Boss Battle Sequence, few special rules...

            {
                    illbaneCount -= 4;

                    System.out.println("-------------------------------------------------");
                    System.out.println("\t# A great beast stirs! #");

                    int redDrakeHealth = 2500;
                    String enemyBoss = bossList[0];

                    System.out.println("\t# " + enemyBoss + " appears! #\n");

                    while(redDrakeHealth > 0)

                    {
                        // Enemy introduction and presentation of options.

                        System.out.println("\tYour HP is: " + playerHealth);
                        System.out.println("\t" + enemyBoss + "'s HP: " + redDrakeHealth);
                        System.out.println("\n\tWhat would you like to do?");

                        // Player options

                        System.out.println("\t1. Attack");
                        System.out.println("\t2. Drink health potion");
                        System.out.println("\t3. Run!");
                        System.out.println("\t4. Drink strength potion");

                        String inputBossFight = console.nextLine();

                        if (inputBossFight.equals("1"))

                        {

                            int bossDamageDealt = rand.nextInt(playerAttackDamage) - (redDrakeArmor);
                            int bossDamageTaken = rand.nextInt(redDrakeAttack) - (playerArmorValue);

                            redDrakeHealth -= bossDamageDealt;
                            playerHealth -= bossDamageTaken;

                            if (bossDamageTaken <= 0)
                            {

                                bossDamageTaken = rand.nextInt(20) + 10;

                            }

                            System.out.println("\t> You strike the " + enemyBoss + " for " + bossDamageDealt + " damage.");
                            System.out.println("\t> You recieve " + bossDamageTaken + " in retaliation!");

                            if(playerHealth < 1)

                            {

                                System.out.println("\t> You have taken too much damage, you are too weak to go on!");
                                break;

                            }

                        }

                        else if (inputBossFight.equals("2"))

                        {

                            if(numHealthPotions > 0)
                            {

                                playerHealth += healthPotionEffect;
                                numHealthPotions--;
                                System.out.println("\t> You drink a health potion and recover " + healthPotionEffect + " health!"
                                                   + "\n\t> You now have " + playerHealth + " HP."
                                                   + "\n\t> You have " + numHealthPotions + " health potions left.\n)");

                            }

                            else
                            {

                                System.out.println("\t> You have no health potions left! ");

                            }

                        }

                        else if (inputBossFight.equals("3"))

                        {

                            System.out.println("\tYou run away from the " + enemy + "!");
                            continue GAME; 

                        }

                        else if (input.equals("4"))

                        {

                            int playerAttack = playerAttackDamage;

                            if (numStrengthPotions > 0)

                            playerAttackDamage = playerAttack * strengthPotionEffect;
                            numStrengthPotions--;

                            System.out.println("You drank a strength potion and your attack has multiplied by: " + strengthPotionEffect + " time(s).!");

                        }


                        else

                        {

                            System.out.println("\tInvalid command...");

                        }

                    }

                    if (playerHealth < 1)

                    {

                        System.out.println("\n\tYou crawl out of the dungeon to live and fight another day.");
                        break;

                    }

                    if (redDrakeHealth <= 100)

                    {

                        System.out.println("\n\t!!!# The Red Drake unleashes it's special attack #!!!");

                        playerHealth -= redDrakeSpecialAttackValue;

                        System.out.println("\t>!!!# You recieve " + redDrakeSpecialAttackValue + " in retaliation from the Drake's fiery breath! #!!!");

                    }

                    System.out.println("-------------------------------------------------");
                    System.out.println(" # " + enemyBoss + " was defeated! #");
                    System.out.println(" # You have " + playerHealth + " HP left. #");

                    playerAttackDamage = initialPlayerAttack;

                    if(rand.nextInt(100) < healthPotionDropChance)

                    {

                        numHealthPotions++;
                        numStrengthPotions++;

                        System.out.println(" # The " + enemyBoss + " dropped a health potion, and a strength potion! # ");
                        System.out.println(" # You have " + numHealthPotions + " health potion(s), and " + numStrengthPotions + "! #");

                    }

                    if(rand.nextInt(100) < goldDropChance)

                    {

                        goldDropAmount = rand.nextInt(500) + 1000;
                        goldAmount += goldDropAmount;

                        System.out.println(" # The " + enemyBoss + " dropped " + goldDropAmount + " gold! #");
                        System.out.println(" # You now have " + goldAmount + " gold. #");

                    }

                    if (rand.nextInt(100) < crimsonSwordDropChance)

                    {

                        System.out.println("\n\t!!!# The fearsome Red Drake has dropped a ruby sword of power, your attack has increased five fold! #!!!");

                        playerAttackDamage *= 5;

                    }

                    else if (illbaneCount != 4)

                    {

                        System.out.println("You do not have enough illbane to make a worthy sacrifice!");

                        continue GAME;

                    }

            }



            else if (input.equals("3"))         // Shop Sequence

            {

                System.out.println("\nWelcome to the sshhop outssider...");
                System.out.println("What would you like to buy?");

                randomItem = shopItems[rand.nextInt(shopItems.length)];

                SHOP:
                System.out.println("\nWould to like to buy a(n): " + randomItem + "?");

                if (randomItem.equals("Silver Sword"))

                {

                    System.out.println("\nThat will be 1000 gold.");

                }

                else if (randomItem.equals("Steel Sword"))

                {

                    System.out.println("\nThat will be 250 gold.");

                }

                else if (randomItem.equals("Iron Helmet"))

                {

                    System.out.println("\nThat will be 150 gold.");

                }

                else if (randomItem.equals("Iron Chestplate"))

                {

                    System.out.println("\nThat will be 200 gold.");

                }

                else if (randomItem.equals("Iron Boots"))

                {

                    System.out.println("\nThat will be 100 gold.");

                }

                else if (randomItem.equals("Iron Gauntlets"))

                {

                    System.out.println("\nThat will be 75 gold.");

                }

                else if (randomItem.equals("Steel Helmet"))

                {

                    System.out.println("\nThat will be 400 gold.");

                }

                else if (randomItem.equals("Steel Chestplate"))

                {

                    System.out.println("\nThat will be 600 gold.");

                }

                else if (randomItem.equals("Steel Boots"))

                {

                    System.out.println("\nThat will be 300 gold.");

                }

                else if (randomItem.equals("Steel Gauntlets"))

                {

                    System.out.println("\nThat will be 250 gold.");

                }

                else if (randomItem.equals("Illbane"))

                {

                    System.out.println("\nThat will be 2500 gold. Interesting...");

                }

                System.out.println("1. Yes");
                System.out.println("2. No");

                String input1 = console.nextLine();

                if (input1.equals("1") && randomItem.equals("Silver Sword"))

                {

                    System.out.println("Thank you for your purchase.");

                    goldAmount -= 1000;
                    playerAttackDamage += 100;

                    shopItems[0] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("1") && randomItem.equals("Steel Sword"))

                {

                    System.out.println("Thank you for your purchase.");

                    goldAmount -= 250;
                    playerAttackDamage += 25;

                    shopItems[1] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("1") && randomItem.equals("Iron Helmet"))

                {

                    System.out.println("Thank you for your purchase.");

                    goldAmount -= 150;
                    playerArmorValue += 10;

                    shopItems[2] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("1") && randomItem.equals("Iron Chestplate"))

                {

                    System.out.println("Thank you for your purchase.");

                    goldAmount -= 200;
                    playerArmorValue += 18;

                    shopItems[3] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("1") && randomItem.equals("Iron Boots"))

                {

                    System.out.println("Thank you for your purchase.");

                    goldAmount -= 100;
                    playerArmorValue += 8;

                    shopItems[4] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("1") && randomItem.equals("Iron Gauntlets"))

                {

                    System.out.println("Thank you for your purchase.");

                    goldAmount -= 75;
                    playerArmorValue += 5;

                    shopItems[5] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("1") && randomItem.equals("Steel Helmet"))

                {

                    System.out.println("Thank you for your purchase.");

                    goldAmount -= 300;
                    playerArmorValue += 15 - 10;

                    shopItems[6] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("1") && randomItem.equals("Steel Chestplate"))

                {

                    System.out.println("Thank you for your purchase.");

                    goldAmount -= 600;
                    playerArmorValue += 30 - 20;

                    shopItems[7] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("1") && randomItem.equals("Steel Boots"))

                {

                    System.out.println("Thank you for your purchase.");

                    goldAmount -= 300;
                    playerArmorValue += 18 - 8;

                    shopItems[8] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("1") && randomItem.equals("Steel Gauntlets"))

                {

                    System.out.println("Thank you for your purchase.");

                    goldAmount -= 250;
                    playerArmorValue += 12 - 5;

                    shopItems[9] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("1") && randomItem.equals("Illbane"))

                {

                    System.out.println("Thank you for your purchase. See what you can do with a couple more of those...");

                    goldAmount -= 2500;
                    illbaneCount++;

                    shopItems[10] = "Empty";

                    continue GAME;

                }

                else if (input1.equals("2"))

                {

                    System.out.println("\nWould you like to buy some potions atleast?");
                    System.out.println("1. Yes");
                    System.out.println("2. No!");

                    String input2 = console.nextLine();



                    POTIONCHOICE:

                    if (input2.equals("2"))

                    {

                        System.out.println("\nAlrighty.");

                        continue GAME;

                    }

                    if (input2.equals("1"))

                    {

                        System.out.println("\nHealth Potions or Strength Potions?");
                        System.out.println("1. Health Potions: 100 gold");
                        System.out.println("2. Strength Potions: 500 gold");
                        System.out.println("3. Nevermind!");

                        String input3 = console.nextLine();

                        if (input2.equals("3"))

                        {

                            System.out.println("Then get on wiv' it!");

                            continue GAME;

                        }

                        else if (input3.equals("1"))

                        {

                            System.out.println("How many would you like to buy?");
                            int inputNumH = console.nextInt();

                            goldAmount -= inputNumH * 100;
                            numHealthPotions += inputNumH;

                            System.out.println("Here you are: " + inputNumH + " health potions.");

                            continue GAME;

                        }

                         else if (input3.equals("2"))

                         {

                             System.out.println("How many would you like to buy?");
                             int inputNumS = console.nextInt();

                             goldAmount -= inputNumS * 500;
                             numStrengthPotions += inputNumS;

                             System.out.println("Here you are: " + inputNumS + " strength potions.");

                             continue GAME;

                         }

                         else if (input3.equals("3"))

                         {

                             System.out.println("Stop wasting my time!");

                             continue GAME;

                         }

                         else

                         {

                             System.out.println("What are you trying to say?!");

                             continue GAME;

                         }



                        }



                }

                System.out.println("\n\t# THANKS FOR PLAYING! # ");

                break;

            }

        }

    }
}